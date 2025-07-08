
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Package, User as UserIcon, Calendar, Mail, Edit3, Star, ShoppingBag } from 'lucide-react';
import { ordersAPI } from '../services/api';
import { toast } from '@/hooks/use-toast';

interface Order {
  _id: string;
  totalPrice: number;
  createdAt: string;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersAPI.getMyOrders();
        setOrders(response.data);
      } catch (error) {
        toast({
          title: "Error loading orders",
          description: "Could not fetch your order history.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalOrders = orders.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              My Account
            </h1>
            <p className="text-gray-600">Manage your profile and track your orders</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
                  <p className="text-gray-600">Total Orders</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">${totalSpent.toFixed(2)}</p>
                  <p className="text-gray-600">Total Spent</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-100 rounded-full">
                  <UserIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">Active</p>
                  <p className="text-gray-600">Account Status</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-white/20">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'orders'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Order History</span>
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                      <UserIcon className="w-4 h-4" />
                      <span>Full Name</span>
                    </label>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-gray-800 font-medium">{user?.name || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email Address</span>
                    </label>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-gray-800 font-medium">{user?.email || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <UserIcon className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{user?.name}</h3>
                    <p className="text-gray-600">Valued Customer</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
              
              {loading ? (
                <div className="grid gap-6">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/20">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-200">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </h3>
                          <p className="text-gray-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            ${order.totalPrice}
                          </p>
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-sm rounded-full font-medium">
                            Completed
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Items Ordered:</h4>
                        <div className="space-y-3">
                          {order.orderItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                              <span className="text-gray-700 font-medium">
                                {item.name} × {item.quantity}
                              </span>
                              <span className="font-bold text-gray-800">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
