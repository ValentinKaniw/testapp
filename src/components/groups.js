import React from 'react';
import { connect } from "react-redux";
import CacheManager from '../cache';
import { refreshState, markCompleted, editTodo } from '../redux/actions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';

import EditDialog from './editDialog'


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

    handleListItemClick = (item) => {
        this.props.markCompleted(item);
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
        const { classes, todos, editTodo } = this.props;
        const { selectedIndex, loading } = this.state;
        
        const items = Object.keys(todos).map(key => todos[key]);
        return (
            <React.Fragment>
                <b>{selectedIndex}</b>
                <List className={classes.root}>
                    {
                        items && items.length
                        ? items.filter(x => !x.completed).map((item, index) => (
                            <ListItem
                                key={index}
                                button
                                onClick={() => this.handleListItemClick(item)}
                            >
                                <Checkbox
                                    checked={item.completed}
                                    tabIndex={-1}
                                    disableRipple
                                    />
                                <ListItemText primary={item.content} />
                                <ListItemSecondaryAction>
                                    <EditDialog item={item} editTodo={editTodo}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                    ))
                    : (loading ? 
                        <CircularProgress/>
                        : "Пусто")
                    }
                </List>
                <Divider />
                <List>
                    {
                        items.filter(x => x.completed).map((item, index) => (
                            <ListItem
                                key={index}
                                button
                                onClick={() => this.handleListItemClick(item)}
                            >
                                <Checkbox
                                    checked={item.completed}
                                    tabIndex={-1}
                                    disableRipple
                                    />
                                <ListItemText primary={item.content} className='done-item'/>
                            </ListItem>
                        ))
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
    const todos = state.todos;
    return { todos };
};

const mapDispatchToProps = dispatch => ({
    refreshState: state => dispatch(refreshState(state)),
    markCompleted: item => dispatch(markCompleted(item)),
    editTodo: item => dispatch(editTodo(item))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FolderList));
