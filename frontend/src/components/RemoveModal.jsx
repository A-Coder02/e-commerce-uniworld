import React from "react";
import Modal from "./layout-ui/Modal";
import Button from "./form-ui/Button";

/**
 * A modal component to confirm item removal.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.show - Controls the visibility of the modal.
 * @param {function} props.setShow - Function to update the modal visibility.
 * @param {Object} props.initialValues - The initial data for the item to be removed.
 * @param {function} props.onSubmit - Function to handle item removal.
 * @param {boolean} [props.loading=false] - Indicates if the removal is in progress.
 * @returns {JSX.Element} The rendered confirmation modal component.
 */
const RemoveModal = ({
  show,
  setShow,
  initialValues,
  onSubmit,
  loading = false,
}) => {
  return (
    <Modal loading={loading} show={show} setShow={setShow} title={"Sure??"}>
      <div className="p-4">
        <div className="flex flex-col gap-2">
          <p>Are you sure want to remove {initialValues?.name}?</p>
          <Button
            type="submit"
            disabled={loading}
            isLoading={loading}
            onClick={() => onSubmit(initialValues)}
          >
            Sure, I want
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveModal;
