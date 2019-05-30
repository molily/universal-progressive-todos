/** @jsx h */
import { h } from 'preact';
import PropTypes from 'prop-types';
import todoPropType from './todoPropType';
import { todoPath } from '../utils/url';

const isEditingField = (fields, field) => fields.indexOf(field) !== -1;

const UpdateTodoForm = ({
  children, todo, fields, onSubmit
}) => {
  const makeHiddenField = (field) => (
    isEditingField(fields, field)
      ? undefined
      : <input type='hidden' name={field} value={String(todo[field])} />
  );

  return (
    <form
      action={todoPath(todo)}
      method='post'
      onSubmit={onSubmit}
      className='inline-form'
    >
      <input type='hidden' name='_method' value='PUT' />
      <input type='hidden' name='id' value={todo.id} />
      {makeHiddenField('text')}
      {makeHiddenField('completed')}
      {makeHiddenField('editMode')}
      {children}
    </form>
  );
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
