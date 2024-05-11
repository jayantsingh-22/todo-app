import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import classnames from "classnames";

import { REMOVE_COMPLETED_ITEMS } from "../constants";

export function Footer({ todos, dispatch }) {
  const { pathname: route } = useLocation();

  const activeTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos]
  );

  const removeCompleted = useCallback(
    () => dispatch({ type: REMOVE_COMPLETED_ITEMS }),
    [dispatch]
  );

  // prettier-ignore
  if (todos.length === 0)
        return null;

  return (
    <footer className="footer" data-testid="footer">
      <span className="todo-count" data-testid="item-left">
        {`${activeTodos.length} ${
          activeTodos.length === 1 ? "item" : "items"
        } left!`}
      </span>
      <ul className="filters" data-testid="footer-navigation">
        <li>
          <a
            className={classnames({ selected: route === "/" })}
            data-testid="all-items"
            href="#/"
          >
            All
          </a>
        </li>
        <li>
          <a
            className={classnames({ selected: route === "/active" })}
            data-testid="active-items"
            href="#/active"
          >
            Active
          </a>
        </li>
        <li>
          <a
            className={classnames({ selected: route === "/completed" })}
            data-testid="completed-items"
            href="#/completed"
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        className="clear-completed"
        disabled={activeTodos.length === todos.length}
        onClick={removeCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
}
