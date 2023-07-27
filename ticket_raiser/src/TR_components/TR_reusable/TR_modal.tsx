import React from 'react'
import { Dialog, Box, Modal } from "@material-ui/core";
type dialoagProps = {
    open: boolean,
    children: any
    onClose: any
}

export const TR_modal = (props: dialoagProps) => {
    const { open, children, onClose } = props
    return (
        <>
            <Modal open={open} onClose={onClose} className='container'>
                <Box className='center_div'>
                    <Box className="px-5 pb-3 mt-3 ticket_raise_form bg-white">
                        {children}
                    </Box>

                </Box>
            </Modal>

        </>
    )
}
