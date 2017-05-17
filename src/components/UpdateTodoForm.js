import _ from 'lodash';
import { h } from 'preact';
import PropTypes from 'prop-types';
import todoPropType from './todoPropType';
import { todoPath } from '../utils/url';

const isEditingField = (fields, field) =>
  fields.indexOf(field) !== -1;

const UpdateTodoForm = ({ children, todo, fields, onSubmit }) => {
  const isEditing = _.partial(isEditingField, fields);
  const completedField = !isEditing('completed') &&
    <input type='hidden' name='completed' value={todo.completed} />;
  const textField = !isEditing('text') &&
    <input type='hidden' name='text' value={todo.text} />;
  const editModeField = !isEditing('editMode') &&
    <input type='hidden' name='editMode' value={todo.editMode} />;

  return <form action={todoPath(todo)} method='post'
    onSubmit={onSubmit} className='inline-form'>
    <input type='hidden' name='_method' value='PUT' />
    <input type='hidden' name='id' value={todo.id} />
    {textField}
    {completedField}
    {editModeField}
    {children}
  </form>;
};

UpdateTodoForm.defaultProps = {
  fields: []
};

UpdateTodoForm.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  todo: todoPropType.isRequired,
  // The fields being edited, inputs given in the children
  fields: PropTypes.arrayOf(PropTypes.string)
};

export default UpdateTodoForm;
