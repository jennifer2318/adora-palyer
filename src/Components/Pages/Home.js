import React, {Component} from 'react';
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import {withRouter, Route, Switch} from "react-router-dom";
import Player from "../Player";
import Section from "../Section";
import Field from "../Field";
import Icon from "../Icon";
import LeftMenu from "../LeftMenu";
import NewTracksBlock from "../NewTracksBlock";
import {getAuthInfo, getAccountInfo} from "../../Actions/apiActions";

class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {authInfo, account} = this.props;

        if (!account.login) {
            this.props.getAccountInfo();
        }

        if (!authInfo.login) {
            this.props.getAuthInfo();
        }
    }

    fieldChangeHandler = obj => {

    };

    render() {
        const {user} = this.props;

        return (
            <>
                <Section className='container-section' container={"container-fluid"}>
                    <div className='left-block-container'>
                        <LeftMenu/>
                    </div>
                    <div className='main-container'>
                        <Section className='top-section' container={"container-fluid"}>
                            <Field className='search-field' type={"search"} onChange={this.fieldChangeHandler} name={'search'} id={'search'} placeholder={'Трек, альбом, исполнитель, подкаст'} btn={
                                <button className="search__button button" type="button">
                                    <Icon className={'search__button-icon'} iconName={'far fa-search'} />
                                </button>
                            } />
                            <div className="top-section__actions">
                                <button className="button"><Icon iconName={'far fa-cog'} /></button>
                                <button className="button"><Icon iconName={'far fa-sign-out-alt'} /></button>
                            </div>
                        </Section>
                        <Switch>
                            <Route path='/' exact={true}>
                                <Section className='home-section' container={"container-fluid"}>
                                    <NewTracksBlock/>
                                </Section>
                            </Route>
                        </Switch>
                    </div>
                </Section>
                <Player src={'/'} />
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    authInfo: state.authInfo,
    account: state.account,
});

const mapDispatchToProps = dispatch => ({
    getAccountInfo: () => dispatch(getAccountInfo()),
    getAuthInfo: () => dispatch(getAuthInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(Home)));