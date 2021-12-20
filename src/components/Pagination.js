import { useEffect, useState } from "react";

const Pagination = (props) => {
  var size = props.blogCount;
  useEffect(() => {
    console.log(size / 2);
  }, []);
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link paginate-round" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        {size > 1 &&
          Array.apply(null, Array(Math.round(size/2))).map((x, i) => (
            <li class="page-item">
              <a
                class="page-link paginate-round"
                onClick={() => props.setPage(i)}
                href="#"
              >
                {i + 1}
              </a>
            </li>
          ))}
        <li class="page-item">
          <a
            class={`page-link paginate-round ${
              props.page <= props.blogCount / 2 && "paginate-round"
            }`}
            href="#"
            aria-label="Next"
            onClick={() => props.setPage(props.page + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
