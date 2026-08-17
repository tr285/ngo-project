import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatCard from '../../components/dashboard/admin/StatCard';
import DonationsChart from '../../components/dashboard/admin/DonationsChart';
import CampaignChart from '../../components/dashboard/admin/CampaignChart';
import UserDistributionChart from '../../components/dashboard/admin/UserDistributionChart';
import RecentDonationsTable from '../../components/dashboard/admin/RecentDonationsTable';
import RecentActivities from '../../components/dashboard/admin/RecentActivities';
import UpcomingEvents from '../../components/dashboard/admin/UpcomingEvents';
import { adminService } from '../../services/adminService';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

const AdminDashboard = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboard, setDashboard] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await adminService.getDashboard();
      setDashboard(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard analytics.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (!dashboard) return null;

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400">Admin Dashboard</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Live overview of NGO operations and key metrics
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboard.stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DonationsChart data={dashboard.monthlyDonations} isDark={isDark} />
        </div>
        <UserDistributionChart data={dashboard.userDistribution} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <CampaignChart data={dashboard.campaignPerformance} isDark={isDark} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <RecentDonationsTable donations={dashboard.recentDonations} />
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
        <RecentActivities activities={dashboard.recentActivities} />
        <UpcomingEvents events={dashboard.upcomingEvents} />
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
