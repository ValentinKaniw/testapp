import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import OutlinedTextFields from './textField'

const styles = {
  root: {
    flexGrow: 1,
  },
};

class SimpleAppBar extends React.Component {
  render() {
    const { classes, add_item } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <OutlinedTextFields add_item={add_item}/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);