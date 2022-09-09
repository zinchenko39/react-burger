import React from "react";

function useModalControls (e) {
    const [isModalOpen, SetIsModalOpen] = React.useState(false);
    
    function handleModalOpen() {
        SetIsModalOpen(true);
    }

    function handleModalClose() {
        SetIsModalOpen(false);
    }

    return {
        open: handleModalOpen,
        close: handleModalClose,
        isModalOpen
    }
}

export default useModalControls;