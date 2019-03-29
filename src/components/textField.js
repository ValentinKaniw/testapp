import React from 'react';
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
  state = {
    name: 'Cat in the Hat',
    test: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClickAddItem = () => {
    this.props.add_item(this.state.name);
    this.setState({test: this.state.name});
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
          onChange={this.handleChange('name')}
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

export default withStyles(styles)(OutlinedTextFields);