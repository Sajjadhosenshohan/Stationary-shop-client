
import {
    ShoppingBag,
    Package,
    Users,
    Settings,
    LayoutDashboard,
    FileText,
    Heart,
    CreditCard,
  } from 'lucide-react';
  
 export const adminMenuItems = [
    { key: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Overview', path: '/dashboard' },
    { key: '/dashboard/orders', icon: <ShoppingBag className="h-5 w-5" />, label: 'Orders', path: '/dashboard/orders' },
    { key: '/dashboard/products', icon: <Package className="h-5 w-5" />, label: 'Products', path: '/dashboard/products' },
    { key: '/dashboard/users', icon: <Users className="h-5 w-5" />, label: 'Users', path: '/dashboard/users' },
    { key: '/dashboard/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings', path: '/dashboard/settings' },
  ];

 export  const userMenuItems = [
    { key: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Overview', path: '/dashboard' },
    { key: '/dashboard/order-history', icon: <FileText className="h-5 w-5" />, label: 'Order History', path: '/dashboard/order-history' },
    { key: '/dashboard/wishlist', icon: <Heart className="h-5 w-5" />, label: 'Wishlist', path: '/dashboard/wishlist' },
    { key: '/dashboard/payment-methods', icon: <CreditCard className="h-5 w-5" />, label: 'Payment Methods', path: '/dashboard/payment-methods' },
    { key: '/dashboard/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings', path: '/dashboard/settings' },
  ];