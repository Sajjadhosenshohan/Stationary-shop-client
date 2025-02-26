
import {
    ShoppingBag,
    Package,
    Users,
    LayoutDashboard,
    FileText,
  } from 'lucide-react';
  
 export const adminMenuItems = [
    { key: '/dashboard/admin-dashboard-overview', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Overview', path: '/dashboard/admin-dashboard-overview' },
    { key: '/dashboard/orders', icon: <ShoppingBag className="h-5 w-5" />, label: 'Orders', path: '/dashboard/orders' },
    { key: '/dashboard/products', icon: <Package className="h-5 w-5" />, label: 'Products', path: '/dashboard/products' },
    { key: '/dashboard/users', icon: <Users className="h-5 w-5" />, label: 'Users', path: '/dashboard/users' },
  ];

 export  const userMenuItems = [
    { key: '/dashboard/user-dashboard-overview', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Overview', path: '/dashboard/user-dashboard-overview' },
    { key: '/dashboard/order-history', icon: <FileText className="h-5 w-5" />, label: 'Order History', path: '/dashboard/order-history' }
  ];