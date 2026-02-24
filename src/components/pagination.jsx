export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
  if (!totalPages || totalPages < 1) return null;

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "page-btn active" : "page-btn"}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}