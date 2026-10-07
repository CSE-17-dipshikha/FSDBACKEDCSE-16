function SearchStudent({ search, setSearch }) {
  return (
    <div className="search-box">
      <h2>Search Student</h2>

      <input
        type="text"
        placeholder="Search by Student ID or Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <button onClick={() => setSearch("")}>
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchStudent;