import React from 'react';
import { useDispatch } from 'react-redux';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionDelete from '@material-ui/icons/Delete';
import classNames from 'classnames';
import { useTranslate } from 'react-admin';
import { startUndoable } from 'ra-core/esm';

import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { ITCrudDelete } from '../../configurations/actions/CrudActions';

const useStyles = makeStyles((theme) => ({
    deleteButton: {
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent'
            }
        }
    }
}));

// const sanitizeRestProps = ({basePath, classes, dispatchCrudDelete, filterValues, label, resource, selectedIds, startUndoable, undoable, redirect, translate, ...rest}) => rest;

export const MyDeleteButton = (props) => {
    const classes = useStyles(props);
    const translate = useTranslate();
    const dispatch = useDispatch();
    const dispatchCrudDelete = dispatch(ITCrudDelete);

    const handleDelete = (event) => {
        event.stopPropagation();
        const {
            resource,
            record,
            basePath,
            redirect,
            undoable,
            onClick
        } = props;
        const resourceName = translate(`resources.${resource}.name`);
        if (undoable) {
            dispatch(
                startUndoable(
                    dispatchCrudDelete({
                        resource,
                        id: record.id,
                        record,
                        basePath,
                        redirect,
                        resourceName
                    })
                )
            );
        } else {
            dispatchCrudDelete({
                resource,
                id: record.id,
                record,
                basePath,
                redirect,
                resourceName
            });
        }

        if (typeof onClick === 'function') {
            onClick();
        }
    };

    const { label = 'ra.action.delete', className, icon } = props;
    return (
        <Button
            onClick={handleDelete}
            label={label}
            className={classNames(
                'ra-delete-button',
                classes.deleteButton,
                className
            )}
            key="button"
        >
            {icon}
        </Button>
    );
};

MyDeleteButton.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func
    ]),
    resource: PropTypes.string.isRequired,
    undoable: PropTypes.bool,
    icon: PropTypes.element,
    onClick: PropTypes.func
};

MyDeleteButton.defaultProps = {
    redirect: 'list',
    undoable: false,
    icon: <ActionDelete />
};
