import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { showNotification, useTranslate } from 'react-admin';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ITCrudDelete } from '../../configurations';
import { preventDefaultOnClick, getNotificationName } from '../../utils';
import MyIconButton from '../button/MyIconButton';
import { NOTIFICATION_TYPE } from '../messageBox';

const MyControlField = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const translate = useTranslate();
    const {
        className,
        hasEdit,
        hasDelete,
        basePath,
        resource,
        record,
        urlFormat,
        deleteMessage,
        deleteCallback,
        getNotificationName,
        optimisticDelete,
        enableTooltip
    } = props;
    const { id } = record;

    let url = '';
    if (urlFormat) {
        url = urlFormat(record);
    } else {
        url = `${basePath}/${id}/edit`;
    }

    const resourceName = getNotificationName(record, resource, translate);

    const onEdit = useCallback(() => {
        history.push(url);
    }, [history, url]);

    const onDelete = useCallback(() => {
        dispatch(
            showNotification(deleteMessage, NOTIFICATION_TYPE.INFO, {
                actions: [
                    {
                        label: 'button.delete',
                        callback: () => {
                            dispatch(
                                ITCrudDelete({
                                    resource,
                                    id,
                                    record,
                                    basePath,
                                    resourceName,
                                    callback: deleteCallback,
                                    optimistic: optimisticDelete
                                })
                            );
                        }
                    }
                ],
                messageArgs: {
                    resourceName
                }
            })
        );
    }, [basePath, deleteMessage, dispatch, id, record, resource, resourceName, deleteCallback, optimisticDelete]);

    return (
        <div className={classNames('d-flex', className)} onClick={preventDefaultOnClick}>
            {hasEdit && (
                <MyIconButton enableTooltip={enableTooltip} popLabel="ra.action.edit" onClick={onEdit} className={hasDelete && 'mr-1'}>
                    <FontAwesomeIcon icon={faEdit} />
                </MyIconButton>
            )}
            {hasDelete && (
                <MyIconButton enableTooltip={enableTooltip} popLabel="ra.action.delete" onClick={onDelete} className={hasEdit && 'ml-1'}>
                    <FontAwesomeIcon icon={faTrash} />
                </MyIconButton>
            )}
        </div>
    );
};

MyControlField.propTypes = {
    record: PropTypes.object,
    resource: PropTypes.string,
    basePath: PropTypes.string,
    hasEdit: PropTypes.bool,
    hasDelete: PropTypes.bool,
    urlFormat: PropTypes.func,
    deleteMessage: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    label: PropTypes.string,
    getNotificationName: PropTypes.func,
    optimisticDelete: PropTypes.bool,
    deleteCallback: PropTypes.func,
    enableTooltip: PropTypes.bool
};

MyControlField.defaultProps = {
    hasEdit: true,
    hasDelete: true,
    deleteMessage: 'commons.message.delete',
    label: 'ra.action.editDelete',
    getNotificationName,
    optimisticDelete: false,
    enableTooltip: true
};

export default MyControlField;
