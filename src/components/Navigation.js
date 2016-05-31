import React, { PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import List from 'material-ui/lib/lists/list';
import FlatButton from 'material-ui/lib/flat-button';
import Avatar from 'material-ui/lib/Avatar';


class Navigation extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
        };
    }

    toggle = () => this.setState({ open: !this.state.open });

    render() {
        const topicNodes = this.props.topics.map(topic => {
            return (
                <MenuItem
                    linkButton={true}
                    key={topic.id}
                    // href={"#/topics/" + topic.id}
                    onTouchTap={() => {
                        this.props.onTopicSelected({ topic });
                        this.setState({ open: false });
                    }}
                >
                    {topic.name}
                </MenuItem>
            );
        });

        let authButton = (
            <FlatButton
                label="Log in"
                primary={true}
                onMouseUp={this.props.showLock}
            />
        );

        if (this.props.profile) {
            authButton = (
                <FlatButton
                    icon={<Avatar src={this.props.profile.picture} />}
                    label="Log out"
                    primary={true}
                    onMouseUp={this.props.showLock}
                />
            );
        }

        return (
            <div>
                <AppBar
                    title="Coder daily"
                    onTitleTouchTap={this.toggle}
                    onLeftIconButtonTouchTap={this.toggle}
                    iconElementRight={authButton}
                >
                </AppBar>

                <LeftNav open={this.state.open}
                    docked={false}
                    onRequestChange={open => this.setState({ open })}
                    onItemTouchTap={item => console.log(item)}
                >
                    <List>
                        {topicNodes}
                    </List>
                </LeftNav>
            </div>
        );
    }
}

Navigation.propTypes = {
    topics: PropTypes.arrayOf(
        React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            description: React.PropTypes.string.isRequired,
            id: React.PropTypes.string.isRequired,
        })
    ).isRequired,
    profile: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
    }),
    showLock: React.PropTypes.func.isRequired,
};

export default Navigation;
