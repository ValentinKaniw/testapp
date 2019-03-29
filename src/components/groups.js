import React from 'react';
import { connect } from "react-redux";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import EditIcon from '@material-ui/icons/Edit';

const styles = () => ({
  root: {
    width: '100%',
    marginTop: 4,
    backgroundColor: 'white',
  },
});


class FolderList extends React.Component {
    state = {
        selectedIndex: null,
    };
    handleListItemClick = (index) => {
        this.setState({ selectedIndex: index });
    };
    render () {
        const { classes, todos } = this.props;
        const { selectedIndex } = this.state;
        const items = Object.keys(todos).map(key => todos[key]);
        return (
            <React.Fragment>
                <b>{selectedIndex}</b>
                <List className={classes.root}>
                    {
                        items && items.length
                        ? items.map((item, index) => (
                            <ListItem
                                key={index}
                                button
                                onClick={() => this.handleListItemClick(index)}
                            >
                                <Avatar>
                                <ImageIcon />
                                {index}
                                </Avatar>
                                <ListItemText primary={item.content} secondary="Jan 9, 2014" />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Edit">
                                        <EditIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                    ))
                    : "Пусто"
                    }
                </List>
            </React.Fragment>
        );
    }
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
    const todos = state.todos.byIds;
    console.log(todos);
    return { todos };
};
export default connect(mapStateToProps)(withStyles(styles)(FolderList));
