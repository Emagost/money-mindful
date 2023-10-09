import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { memo } from "react";

type TProps = {
  onModalOpen: () => void;
};

const AddSpentButton = ({ onModalOpen }: TProps) => {
  return (
    <Box>
      <Button startIcon={<AddIcon />} onClick={onModalOpen}>
        Add new expense
      </Button>
    </Box>
  );
};

export default memo(AddSpentButton);
