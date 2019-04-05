import React from 'react';
import { connect } from "react-redux";
import CacheManager from '../cache';
import { refreshState } from '../redux/actions';

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
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  root: {
    width: '100%',
    marginTop: 4,
    backgroundColor: 'white',
  },
});


class FolderList extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: null,
            loading: false
        };
        this.cache = new CacheManager();
    }

    handleListItemClick = (index) => {
        this.setState({ selectedIndex: index });
    };

    refreshState = async () => {
        const oldState = await this.cache.readData('state');
        this.setState({loading: false})
        if (!oldState) {
          // If oldState is null, save it locally
          const data = this.state;
          this.cache.writeData('state', data);
          return
        }
        this.props.refreshState(oldState);
      }
      
      componentWillMount = () => {
        this.setState({loading: true});
        this.refreshState();
      }

    render () {
        const { classes, todos } = this.props;
        const { selectedIndex, loading } = this.state;
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
                    : (loading ? 
                        <CircularProgress/>
                        : "Пусто")
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
    return { todos };
};

const mapDispatchToProps = dispatch => ({
    refreshState: state => dispatch(refreshState(state))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FolderList));
