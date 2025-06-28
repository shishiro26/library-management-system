import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserReservations();
  }, []);

  const fetchUserReservations = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/reservations/user/${user.id}`
      );
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setError("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "RETURNED":
        return "bg-blue-100 text-blue-800";
      case "OVERDUE":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* User Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Personal Information
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Name</span>
                <p className="text-lg font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Username</span>
                <p className="text-lg font-medium">{user?.username}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email</span>
                <p className="text-lg font-medium">{user?.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Role</span>
                <p className="text-lg font-medium capitalize">
                  {user?.role?.toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Account Statistics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {reservations.filter((r) => r.status === "ACTIVE").length}
                </p>
                <p className="text-sm text-gray-600">Active Reservations</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {reservations.filter((r) => r.status === "RETURNED").length}
                </p>
                <p className="text-sm text-gray-600">Books Returned</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservations Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          My Reservations
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {reservations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No reservations found.</p>
            <p className="text-gray-400 mt-2">
              Start by browsing and reserving some books!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reserved Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expected Return
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {reservation.bookTitle && (
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {reservation.bookTitle}
                            </div>
                            <div className="text-sm text-gray-500">
                              by {reservation.bookAuthor}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(reservation.reservationDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(reservation.expectedReturnDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          reservation.status
                        )}`}
                      >
                        {reservation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {reservation.status === "ACTIVE" && (
                        <button
                          onClick={() => {
                            alert(
                              "Return functionality would be implemented here"
                            );
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Return Book
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
