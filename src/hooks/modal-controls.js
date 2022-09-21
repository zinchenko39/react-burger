import { useState } from "react";

function useModalControls () {
    const [isModalOpen, setIsModalOpen] = useState(false);

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