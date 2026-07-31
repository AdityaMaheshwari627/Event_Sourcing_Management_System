function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-blue-600 text-white px-8 py-5 shadow-lg">
        <h1 className="text-3xl font-bold">
          Event Source Banking Dashboard
        </h1>
      </div>

      {/* Main Content */}
      <div className="p-8">

        <h2 className="text-2xl font-bold mb-6">
          Welcome 👋
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500">Balance</h3>
            <h1 className="text-3xl font-bold text-green-600 mt-2">
              ₹0
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500">Deposits</h3>
            <h1 className="text-3xl font-bold text-blue-600 mt-2">
              ₹0
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500">Withdrawals</h3>
            <h1 className="text-3xl font-bold text-red-600 mt-2">
              ₹0
            </h1>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;