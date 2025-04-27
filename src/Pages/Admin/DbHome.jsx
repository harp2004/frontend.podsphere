
const DbHome = () => {
  return (
    <div className="p-6 md:p-10 bg-white rounded-2xl shadow-lg text-gray-800">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-yellow-500 mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Seamlessly manage <span className="font-semibold">Categories</span>, <span className="font-semibold">Users</span>, <span className="font-semibold">Podcasts</span>, and <span className="font-semibold">More</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-yellow-100 hover:bg-yellow-200 transition p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-bold">Categories</h3>
          <p className="text-sm text-gray-600">Add or manage podcast categories</p>
        </div>
        <div className="bg-yellow-100 hover:bg-yellow-200 transition p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-bold">Users</h3>
          <p className="text-sm text-gray-600">Manage registered users</p>
        </div>
        <div className="bg-yellow-100 hover:bg-yellow-200 transition p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-bold">Podcasts</h3>
          <p className="text-sm text-gray-600">Control all podcast content</p>
        </div>
        <div className="bg-yellow-100 hover:bg-yellow-200 transition p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-bold">Logs</h3>
          <p className="text-sm text-gray-600">Track user & admin activities</p>
        </div>
      </div>
    </div>
  );
};

export default DbHome;
