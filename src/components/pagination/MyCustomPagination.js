import { makeStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { RedirectCreateButton } from '../button';
import { paginationStyles } from '../MyCustomStyles';
import Pagination from './Pagination';

const useStyles = (splitPagination) => {
    if (splitPagination) {
        paginationStyles.pagination.paddingLeft = 15;
        paginationStyles.pagination.paddingRight = 15;
    } else {
        paginationStyles.pagination.paddingLeft = 0;
        paginationStyles.pagination.paddingRight = 0;
    }
    return makeStyles(paginationStyles, { name: 'Bass-MCP' });
};

const sanitizeProps = ({ setPage, setPerPage, perPage, page, total, ...rest }) => rest;

const MyCustomPagination = (props) => {
    const { children, basePath, createBtn, splitPagination, paginationTop, ...rest } = props;
    const classes = useStyles(splitPagination)();

    const childrenWithProps = React.Children.map(children, (child) => React.cloneElement(child, { ...sanitizeProps(rest) }));
    return (
        <div className={classnames('d-flex flex-nowrap flex-shrink-1', !splitPagination && 'flex-grow-1')}>
            <div className={classnames('d-flex flex-column', paginationTop && 'justify-content-around', 'my-auto flex-shrink-1', !paginationTop && 'flex-grow-1')}>
                <div>
                    {childrenWithProps}
                    {createBtn ? <RedirectCreateButton basePath={basePath} /> : null}
                </div>
            </div>
            <Pagination {...rest} className={classes.pagination} />
        </div>
    );
};

MyCustomPagination.propTypes = {
    basePath: PropTypes.string,
    createBtn: PropTypes.bool,
    children: PropTypes.any,
    splitPagination: PropTypes.bool,
    paginationTop: PropTypes.bool
};

MyCustomPagination.defaultProps = {
    splitPagination: false,
    paginationTop: false
};

export default MyCustomPagination;
