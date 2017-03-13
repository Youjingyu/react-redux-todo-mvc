import React, { Component, PropTypes } from '../node_modules/react/dist/react';
import { connect } from 'react-redux';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './actions';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

class App extends Component {
    render() {
        // ͨ������ connect() ע��:
        const { dispatch, visibleTodos, visibilityFilter } = this.props
        return (
            <div>
                <AddTodo
                    onAddClick={text =>
            dispatch(addTodo(text))
          } />
                <TodoList
                    todos={this.props.visibleTodos}
                    onTodoClick={index =>
            dispatch(completeTodo(index))
          } />
                <Footer
                    filter={visibilityFilter}
                    onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
            </div>
        )
    }
}

App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    })),
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
}

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
    }
}

// ����ȫ�� state ����Щ��������ע��� props ?
// ע�⣺ʹ�� https://github.com/reactjs/reselect Ч�����ѡ�
function select(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    };
}

// ��װ component ��ע�� dispatch �� state ����Ĭ�ϵ� connect(select)(App) �У�
export default connect(select)(App);