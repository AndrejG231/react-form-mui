import { Box, styled } from "@mui/material";

import SomeForm from "./lib/components/SomeForm";

export default function SomeFormPage() {
	return (
		<StyledPageWrapperBox>
			<SomeForm />
		</StyledPageWrapperBox> 
	);
}

const StyledPageWrapperBox = styled(Box)(() => ({
	width: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
}));