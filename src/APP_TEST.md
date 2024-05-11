# Test Plan for Todo Application

## Objective:
The objective of this test plan is to ensure comprehensive test coverage for the Todo application components. The tests will cover various functionalities and edge cases to ensure the application works as expected under different scenarios.

## Components to Test:
1. **Todo List**
2. **Todo Item**
3. **Footer**

---

## 1. Todo List Component

### Type of Tests:
- **Rendering Tests:** Ensure correct rendering of todo list components.
- **User Interaction Tests:** Test user actions such as adding, editing, toggling, and deleting todo items.
- **State Management Tests:** Verify that the state of the todo list is updated accurately.

### Test Cases:
1. **Rendering:**
   - Verify that the todo list renders without crashing.
   - Check if the todo list displays the correct number of items.
   - Ensure the initial state of the todo list is correct.

2. **User Interaction:**
   - Add a new todo item and verify its presence in the list.
   - Toggle a todo item's completion status and check if it updates accordingly.
   - Delete a todo item and verify its removal from the list.
   - Edit a todo item and verify the changes are reflected in the list.

3. **State Management:**
   - Test filtering functionality (e.g., active items, completed items).
   - Test clearing completed items from the list.
   - Ensure the correct count of active items is displayed.

---

## 2. Todo Item Component

### Type of Tests:
- **Rendering Tests:** Ensure correct rendering of todo item components.
- **User Interaction Tests:** Test user actions such as toggling completion status, editing, and deleting todo items.
- **State Management Tests:** Verify that the state of todo items is updated accurately.

### Test Cases:
1. **Rendering:**
   - Ensure that a todo item renders correctly with the provided text.
   - Check if the completion status of the todo item is displayed correctly.
   - Verify the presence of edit and delete buttons.

2. **User Interaction:**
   - Toggle a todo item's completion status and verify its visual representation.
   - Edit a todo item and ensure the changes are reflected in the input field.
   - Delete a todo item and verify its removal from the list.

3. **State Management:**
   - Ensure that changes to a todo item's completion status are reflected in the global state.
   - Verify that edits to a todo item's text are saved correctly.

---

## 3. Footer Component

### Type of Tests:
- **Rendering Tests:** Ensure correct rendering of footer components.
- **User Interaction Tests:** Test user actions such as filtering and clearing completed items.
- **State Management Tests:** Verify that the state of the footer components is updated accurately.

### Test Cases:
1. **Rendering:**
   - Check if the footer renders correctly with the appropriate navigation links.
   - Ensure that the count of active items is displayed accurately.

2. **User Interaction:**
   - Click on different filter links (e.g., All, Active, Completed) and verify the corresponding list view.
   - Click on the "Clear completed" button and verify that completed items are removed from the list.

3. **State Management:**
   - Ensure that the count of active items is updated dynamically based on user actions.
   - Verify that the filter links work correctly and display the appropriate list view.


### Command to run test:
  - npm test

### Tools used for testing:
  - Jest testing library
  - Methods @testing-library/react
  - Memory Router
---

## Conclusion:
By following this test plan and executing the outlined test cases, we aim to achieve comprehensive test coverage for the Todo application components. These tests will ensure that the application functions correctly under various scenarios and meets the specified requirements.