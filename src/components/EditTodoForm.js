import { h } from 'preact';
import { Component } from 'preact-compat';
import PropTypes from 'prop-types';
import todoPropType from './todoPropType';
import UpdateTodoForm from './UpdateTodoForm';

// export default class EditTodoForm extends PureComponent {
export default class EditTodoForm extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.focusTextField();
  }

  shouldComponentUpdate(nextProps) {
    return !(
      this.props.todo === nextProps.todo &&
      this.props.updateTodo === nextProps.updateTodo
    );
  }

  componentDidUpdate() {
    this.focusTextField();
  }

  onSubmit(event) {
    const text = this.refs.text.value;
    this.props.updateTodo({
      ...this.props.todo,
      text,
      editMode: false
    });
    event.preventDefault();
  }

  focusTextField() {
    const { text } = this.refs;
    text.select();
    text.focus();
  }

  render(props) {
    const newTodo = {
      ...props.todo,
      editMode: false
    };
    const fields = [ 'text' ];
    return <UpdateTodoForm todo={newTodo} fields={fields}
      onSubmit={this.onSubmit}>
      <label>
        <span className='accessible-hidden'>Edit todo:</span>
        <input ref='text' type='text' name='text' defaultValue={newTodo.text}
          placeholder='e.g., do the laundry' className='EditTodoForm__input' />
      </label>
      <button type='submit' className='EditTodoForm__submitButton'>
        💾 Save
      </button>
    </UpdateTodoForm>;
  }

}

EditTodoForm.propTypes = {
  todo: todoPropType.isRequired,
  updateTodo: PropTypes.func.isRequired
};
