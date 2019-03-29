import React from 'react';

import { connect } from "react-redux";
import { addTodo } from "../redux/actions";

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
  dense: {
    marginTop: 8,
  },
});

class OutlinedTextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  handleChange = () => event => {
    this.setState({input: event.target.value});
  };

  handleClickAddItem = () => {
    this.props.addTodo(this.state.input);
    this.setState({ input: "" });
  };

  render() {
    const { classes } = this.props;

    return (
        <TextField
          id="outlined-dense"
          label="Dense"
		      fullWidth
          className={classNames(classes.dense)}
          margin="dense"
          variant="outlined"
          onChange={this.handleChange()}
          value={this.state.input}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Add item"
                  onClick={this.handleClickAddItem}
                ><SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null,{ addTodo })(withStyles(styles)(OutlinedTextFields));