import * as PropTypes from 'prop-types';
import { useTranslate } from 'ra-core';
import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-final-form';

const RevertEditButton = (props) => {
    const { changeEditState } = props;

    const translate = useTranslate();
    const form = useForm();
    const goBack = useCallback(() => {
        changeEditState(false);
        form.setConfig('keepDirtyOnReinitialize', false);
        form.reset();
        form.setConfig('keepDirtyOnReinitialize', true);
    }, [changeEditState]);

    return (
        <Button
            variant="itech"
            className="btn btn-itech-secondary btn-itech-fixed mr-3"
            onClick={goBack}
        >
            {translate('button.back')}
        </Button>
    );
};

RevertEditButton.propTypes = {
    changeEditState: PropTypes.func
};

export default RevertEditButton;
