/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-side-effects */
import React from "react";
import {App} from "./todo/app";
import { screen, render, cleanup,waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe('Todo Application Testing', () => {
  afterEach(() => {
    cleanup();
  });

  const customRender = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    );
  };

  //test number 1
  it('item added to list correctly', async () => {
    await act(async () => {
      customRender(<App />);
    });

    const inputField = screen.getByTestId('text-input');
    fireEvent.change(inputField, { target: { value: 'Movie' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });

    const todoItem = screen.getByTestId('todo-item-label');
    expect(todoItem).toHaveTextContent('Movie');
  });

  //test number 2
  it('item getting checked correctly', async () => {
    await act(async () => {
      customRender(<App />);
    });

    //add item
    const inputField = screen.getByTestId('text-input');
    fireEvent.change(inputField, { target: { value: 'Dinner' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });

    //verify item
    const todoItem = screen.getByTestId('todo-item-label');
    expect(todoItem).toHaveTextContent('Dinner');

    //simulate click on checkbox
    const todoToggle = screen.getByTestId('todo-item-toggle');
    fireEvent.click(todoToggle);
    
    //verify item is checked
    const todoItemLi = screen.getByTestId('todo-item');
    expect(todoItemLi).toHaveClass('completed');
  });

  //test number 3
  it('item getting deleted correctly', async () => {
    await act(async () => {
      customRender(<App />);
    });

    //add item
    const inputField = screen.getByTestId('text-input');
    fireEvent.change(inputField, { target: { value: 'Lunch' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });

    //verify item
    const todoItem = screen.getByTestId('todo-item-label');
    expect(todoItem).toHaveTextContent('Lunch');

    //simulate click on delete button
    fireEvent.mouseEnter(todoItem);

    //verify item is deleted
    const todoDelete = screen.getByTestId('todo-item-button');
    fireEvent.click(todoDelete);
    expect(todoItem).not.toBeInTheDocument();
  });

  //test number 4
  it('item getting edited correctly', async () => {
    await act(async () => {
      customRender(<App />);
    });

    const inputField = screen.getByTestId('text-input');
    fireEvent.change(inputField, { target: { value: 'Breakfast' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });

    var todoItem = screen.getByTestId('todo-item-label');
    expect(todoItem).toHaveTextContent('Breakfast');
    
    fireEvent.doubleClick(todoItem);

    await waitFor(() => {
      const newInputField = screen.getAllByTestId('text-input')[1];
      fireEvent.change(newInputField, { target: { value: 'Dinner' } });
      fireEvent.keyDown(newInputField, { key: 'Enter', code: 'Enter' });
      todoItem = screen.getByTestId('todo-item-label');
      expect(todoItem).toHaveTextContent('Dinner');
    });
  });

  //test number 5
  it('multiple items added to list correctly', async () => {
    await act(async () => {
      customRender(<App />);
    });
  
    // Add first item
    const inputField1 = screen.getByTestId('text-input');
    fireEvent.change(inputField1, { target: { value: 'Brunch' } });
    fireEvent.keyDown(inputField1, { key: 'Enter', code: 'Enter' });
  
    // Verify first item
    const todoItem1 = screen.getByTestId('todo-item-label');
    expect(todoItem1).toHaveTextContent('Brunch');
  
    // Add second item
    const inputField2 = screen.getByTestId('text-input');
    fireEvent.change(inputField2, { target: { value: 'Snacks' } });
    fireEvent.keyDown(inputField2, { key: 'Enter', code: 'Enter' });
  
    // Verify second item
    const todoItem2 = screen.getAllByTestId('todo-item-label')[1];
    expect(todoItem2).toHaveTextContent('Snacks');
  
    // Add third item
    const inputField3 = screen.getByTestId('text-input');
    fireEvent.change(inputField3, { target: { value: 'Football' } });
    fireEvent.keyDown(inputField3, { key: 'Enter', code: 'Enter' });
  
    // Verify third item
    const todoItem3 = screen.getAllByTestId('todo-item-label')[2];
    expect(todoItem3).toHaveTextContent('Football');

    expect(screen.getByTestId('item-left')).toHaveTextContent('3 items left!');
  });  

  //test number 6
  it('multiple items getting checked correctly', async () => {
    await act(async () => {
      customRender(<App />);
    });
  
    // Add first item
    const inputField1 = screen.getByTestId('text-input');
    fireEvent.change(inputField1, { target: { value: 'Brunch' } });
    fireEvent.keyDown(inputField1, { key: 'Enter', code: 'Enter' });
  
    // Verify and check first item
    const todoItemLabel1 = screen.getByTestId('todo-item-label');
    expect(todoItemLabel1).toHaveTextContent('Brunch');
    expect(screen.getByTestId('item-left')).toHaveTextContent('1 item left!');
    const todoToggle1 = screen.getByTestId('todo-item-toggle');
    fireEvent.click(todoToggle1);
    expect(screen.getByTestId('item-left')).toHaveTextContent('0 items left!');
  
    // Verify first item is checked
    const todoItemLi1 = screen.getByTestId('todo-item');
    expect(todoItemLi1).toHaveClass('completed');
  
    // Add second item
    const inputField2 = screen.getByTestId('text-input');
    fireEvent.change(inputField2, { target: { value: 'Snacks' } });
    fireEvent.keyDown(inputField2, { key: 'Enter', code: 'Enter' });
  
    // Verify and check second item
    const todoItemLabel2 = screen.getAllByTestId('todo-item-label')[1];
    expect(todoItemLabel2).toHaveTextContent('Snacks');
    expect(screen.getByTestId('item-left')).toHaveTextContent('1 item left!');
    const todoToggle2 = screen.getAllByTestId('todo-item-toggle')[1];
    fireEvent.click(todoToggle2);
    expect(screen.getByTestId('item-left')).toHaveTextContent('0 items left!');
  
    // Verify second item is checked
    const todoItemLi2 = screen.getAllByTestId('todo-item')[1];
    expect(todoItemLi2).toHaveClass('completed');
  
    // Add third item
    const inputField3 = screen.getByTestId('text-input');
    fireEvent.change(inputField3, { target: { value: 'Football' } });
    fireEvent.keyDown(inputField3, { key: 'Enter', code: 'Enter' });
  
    // Verify and check third item
    const todoItemLabel3 = screen.getAllByTestId('todo-item-label')[2];
    expect(todoItemLabel3).toHaveTextContent('Football');
    expect(screen.getByTestId('item-left')).toHaveTextContent('1 item left!');
    const todoToggle3 = screen.getAllByTestId('todo-item-toggle')[2];
    fireEvent.click(todoToggle3);
    expect(screen.getByTestId('item-left')).toHaveTextContent('0 items left!');
  
    // Verify third item is checked
    const todoItemLi3 = screen.getAllByTestId('todo-item')[2];
    expect(todoItemLi3).toHaveClass('completed');
  });

  //test number 7
  it('multiple items getting deleted correctly', async () => {
    await act(async () => {
      customRender(<App />);
    });
  
    // Add first item
    const inputField1 = screen.getByTestId('text-input');
    fireEvent.change(inputField1, { target: { value: 'Item 1' } });
    fireEvent.keyDown(inputField1, { key: 'Enter', code: 'Enter' });
  
    // Verify first item
    const todoItemLabel1 = screen.getAllByTestId('todo-item-label')[0];
    expect(todoItemLabel1).toHaveTextContent('Item 1');

    // Add second item
    const inputField2 = screen.getByTestId('text-input');
    fireEvent.change(inputField2, { target: { value: 'Item 2' } });
    fireEvent.keyDown(inputField2, { key: 'Enter', code: 'Enter' });
  
    // Verify second item
    const todoItemLabel2 = screen.getAllByTestId('todo-item-label')[1];
    expect(todoItemLabel2).toHaveTextContent('Item 2');

    // Add third item
    const inputField3 = screen.getByTestId('text-input');
    fireEvent.change(inputField3, { target: { value: 'Item 3' } });
    fireEvent.keyDown(inputField3, { key: 'Enter', code: 'Enter' });
  
    // Verify third item
    const todoItemLabel3 = screen.getAllByTestId('todo-item-label')[2];
    expect(todoItemLabel3).toHaveTextContent('Item 3');

    expect(screen.getByTestId('item-left')).toHaveTextContent('3 items left!');

    // Simulate click on delete button for first item
    fireEvent.mouseEnter(todoItemLabel1);
    
    // Simulate and verify delete for first item
    const todoDelete1 = screen.getAllByTestId('todo-item-button')[0];
    fireEvent.click(todoDelete1);
    expect(todoItemLabel1).not.toBeInTheDocument();
    expect(screen.getByTestId('item-left')).toHaveTextContent('2 items left!');
  
    
    // Simulate click on delete button for second item
    fireEvent.mouseEnter(todoItemLabel2);
    
    // Simulate and verify delete for second item
    const todoDelete2 = screen.getAllByTestId('todo-item-button')[0];
    fireEvent.click(todoDelete2);
    expect(todoItemLabel2).not.toBeInTheDocument();
    expect(screen.getByTestId('item-left')).toHaveTextContent('1 item left!');
  

    // Simulate click on delete button for third item
    fireEvent.mouseEnter(todoItemLabel3);
    
    // Simulate and verify delete for third item
    const todoDelete3 = screen.getAllByTestId('todo-item-button')[0];
    fireEvent.click(todoDelete3);
    expect(todoItemLabel3).not.toBeInTheDocument();
  });  

  //test number 8
  it('multiple items getting edited correctly', async () => {
    await act(async () => {
      customRender(<App />);
    });
  
    // Add first item
    const inputField1 = screen.getByTestId('text-input');
    fireEvent.change(inputField1, { target: { value: 'Item 1' } });
    fireEvent.keyDown(inputField1, { key: 'Enter', code: 'Enter' });
  
    // Verify first item
    var todoItem1 = screen.getByTestId('todo-item-label');
    expect(todoItem1).toHaveTextContent('Item 1');
  
    // Double click to edit first item
    fireEvent.doubleClick(todoItem1);
  
    // Wait for input field to appear and edit first item
    await waitFor(() => {
      const newInputField1 = screen.getAllByTestId('text-input')[1];
      fireEvent.change(newInputField1, { target: { value: 'Edited Item 1' } });
      fireEvent.keyDown(newInputField1, { key: 'Enter', code: 'Enter' });
      todoItem1 = screen.getByTestId('todo-item-label');
      expect(todoItem1).toHaveTextContent('Edited Item 1');
    });
  
    // Add second item
    const inputField2 = screen.getByTestId('text-input');
    fireEvent.change(inputField2, { target: { value: 'Item 2' } });
    fireEvent.keyDown(inputField2, { key: 'Enter', code: 'Enter' });
  
    // Verify second item
    var todoItem2 = screen.getAllByTestId('todo-item-label')[1];
    expect(todoItem2).toHaveTextContent('Item 2');
  
    // Double click to edit second item
    fireEvent.doubleClick(todoItem2);
  
    // Wait for input field to appear and edit second item
    await waitFor(() => {
      const newInputField2 = screen.getAllByTestId('text-input')[1];
      fireEvent.change(newInputField2, { target: { value: 'Edited Item 2' } });
      fireEvent.keyDown(newInputField2, { key: 'Enter', code: 'Enter' });
      todoItem2 = screen.getAllByTestId('todo-item-label')[1];
      expect(todoItem2).toHaveTextContent('Edited Item 2');
    });
  });

  //test number 9
  it('active items filtering done correctly', async () => {
    await act(async () => {
      customRender(<App />);
    });

    // Add 1st item
    const inputField = screen.getByTestId('text-input');
    fireEvent.change(inputField, { target: { value: 'Movie' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });

    // Verify item
    const todoItem = screen.getByTestId('todo-item-label');
    expect(todoItem).toHaveTextContent('Movie');

    const todoItemLi1 = screen.getAllByTestId('todo-item')[0];

    // Add 2nd item
    const inputField2 = screen.getByTestId('text-input');
    fireEvent.change(inputField2, { target: { value: 'Dinner' } });
    fireEvent.keyDown(inputField2, { key: 'Enter', code: 'Enter' });

    // Verify 2nd item
    const todoItem2 = screen.getAllByTestId('todo-item-label')[1];
    expect(todoItem2).toHaveTextContent('Dinner');

    const todoItemLi2 = screen.getAllByTestId('todo-item')[1];

    // Add 3rd item
    const inputField3 = screen.getByTestId('text-input');
    fireEvent.change(inputField3, { target: { value: 'Lunch' } });
    fireEvent.keyDown(inputField3, { key: 'Enter', code: 'Enter' });

    // Verify 3rd item
    const todoItem3 = screen.getAllByTestId('todo-item-label')[2];
    expect(todoItem3).toHaveTextContent('Lunch');

    //simulate click on checkbox
    const todoToggle = screen.getAllByTestId('todo-item-toggle')[2];
    fireEvent.click(todoToggle);
    
    //verify item is checked
    const todoItemLi3 = screen.getAllByTestId('todo-item')[2];
    expect(todoItemLi3).toHaveClass('completed');

    expect(screen.getByTestId('item-left')).toHaveTextContent('2 items left!');

    const activeButton = screen.getByTestId('active-items');
    fireEvent.click(activeButton);

    expect(todoItemLi1).not.toHaveClass('completed');
    expect(todoItemLi2).not.toHaveClass('completed');
  });

  //test number 10
  it('completed items filtering done correctly', async () => {
    await act(async () => {
      customRender(<App />);
    });

    // Add 1st item
    const inputField = screen.getByTestId('text-input');
    fireEvent.change(inputField, { target: { value: 'Movie' } });
    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });

    // Verify item
    const todoItem = screen.getByTestId('todo-item-label');
    expect(todoItem).toHaveTextContent('Movie');

    const todoItemLi1 = screen.getAllByTestId('todo-item')[0];

    // Add 2nd item
    const inputField2 = screen.getByTestId('text-input');
    fireEvent.change(inputField2, { target: { value: 'Dinner' } });
    fireEvent.keyDown(inputField2, { key: 'Enter', code: 'Enter' });

    // Verify 2nd item
    const todoItem2 = screen.getAllByTestId('todo-item-label')[1];
    expect(todoItem2).toHaveTextContent('Dinner');

    const todoItemLi2 = screen.getAllByTestId('todo-item')[1];

    // Add 3rd item
    const inputField3 = screen.getByTestId('text-input');
    fireEvent.change(inputField3, { target: { value: 'Lunch' } });
    fireEvent.keyDown(inputField3, { key: 'Enter', code: 'Enter' });

    // Verify 3rd item
    const todoItem3 = screen.getAllByTestId('todo-item-label')[2];
    expect(todoItem3).toHaveTextContent('Lunch');

    //simulate click on checkbox
    const todoToggle = screen.getAllByTestId('todo-item-toggle')[2];
    fireEvent.click(todoToggle);
    
    //verify item is checked
    const todoItemLi3 = screen.getAllByTestId('todo-item')[2];
    expect(todoItemLi3).toHaveClass('completed');

    expect(screen.getByTestId('item-left')).toHaveTextContent('2 items left!');

    //simulate click on completed button
    const completedButton = screen.getByTestId('completed-items');
    fireEvent.click(completedButton);

    //verify only completed items are shown
    expect(todoItemLi1).not.toHaveClass('completed');
    expect(todoItemLi2).not.toHaveClass('completed');
  });
});
