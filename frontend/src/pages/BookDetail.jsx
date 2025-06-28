import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const BookDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/books/${id}`
      );
      setBook(response.data);
      fetchSimilarBooks(response.data.categories);
    } catch (error) {
      console.error("Error fetching book details:", error);
      setError("Failed to load book details");
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarBooks = async (categories) => {
    if (!categories || categories.length === 0) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/books/category?categories=${
          categories[0]
        }`
      );
      const similar = response.data.filter((b) => b.id !== id).slice(0, 3);
      setSimilarBooks(similar);
    } catch (error) {
      console.error("Error fetching similar books:", error);
    }
  };

  const handleReserve = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setReserving(true);
    setError("");

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/reservations`, {
        bookId: id,
        userId: user.id,
      });

      setBook((prev) => ({
        ...prev,
        availableCopies: prev.availableCopies - 1,
      }));

      alert("Book reserved successfully!");
    } catch (error) {
      setError(error.response?.data || "Failed to reserve book");
    } finally {
      setReserving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error || "Book not found"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Book Cover */}
          <div className="md:w-1/3">
            {book.coverImageUrl ? (
              <img
                src={book.coverImageUrl}
                alt={book.title}
                className="w-full h-96 md:h-full object-cover"
              />
            ) : (
              <div className="w-full h-96 md:h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No cover image</span>
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {book.categories?.map((category, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>

            {book.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600">{book.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-sm text-gray-500">Available Copies</span>
                <p className="text-lg font-semibold">
                  {book.availableCopies} of {book.totalCopies}
                </p>
              </div>
              {book.publicationYear && (
                <div>
                  <span className="text-sm text-gray-500">
                    Publication Year
                  </span>
                  <p className="text-lg font-semibold">
                    {book.publicationYear}
                  </p>
                </div>
              )}
              {book.isbn && (
                <div>
                  <span className="text-sm text-gray-500">ISBN</span>
                  <p className="text-lg font-semibold">{book.isbn}</p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              {book.availableCopies > 0 ? (
                <button
                  onClick={handleReserve}
                  disabled={reserving}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {reserving ? "Reserving..." : "Reserve Book"}
                </button>
              ) : (
                <button
                  disabled
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}

              <button
                onClick={() => navigate("/books")}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50"
              >
                Back to Books
              </button>
            </div>

            {error && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Books */}
      {similarBooks.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Similar Books
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarBooks.map((similarBook) => (
              <div
                key={similarBook.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {similarBook.coverImageUrl && (
                  <img
                    src={similarBook.coverImageUrl}
                    alt={similarBook.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {similarBook.title}
                  </h3>
                  <p className="text-gray-600 mb-2">by {similarBook.author}</p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        similarBook.availableCopies > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {similarBook.availableCopies > 0
                        ? "Available"
                        : "Out of stock"}
                    </span>
                    <button
                      onClick={() => navigate(`/books/${similarBook.id}`)}
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
