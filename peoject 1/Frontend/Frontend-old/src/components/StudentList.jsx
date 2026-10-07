function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="table-box">
      <h2>All Students</h2>

      {students.length === 0 ? (
        <p className="no-data">No student found</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Branch</th>
                <th>Semester</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.branch}</td>
                  <td>{student.semester}</td>
                  <td>{student.mobile}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => onDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;