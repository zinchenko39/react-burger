import React from "react";

function useModalControls () {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    
    function handleModalOpen() {
        setIsModalOpen(true);
    }

    function handleModalClose() {
        setIsModalOpen(false);
    }

    return {
        open: handleModalOpen,
        close: handleModalClose,
        isModalOpen
    }
}

export default useModalControls;