import { Typography } from "@mui/material";

interface PostDetailProps {
    primaryText: string | number | undefined;
    secondaryText: string | number | undefined;
    secondaryHeader?: boolean;
}

const PostDetail = (props: PostDetailProps) => {
    const {primaryText, secondaryText, secondaryHeader} = props;
    const postDetaliStyle = {
        margin: "6px",
        ...(secondaryHeader && {
            display: "flex",
            flexDirection: "column-reverse" as any,
        }),
    };
    return (
        <div style={postDetaliStyle}>
            <Typography variant="h4">
                {primaryText}
            </Typography>
            <Typography variant="subtitle2">
                {secondaryText}
            </Typography>
        </ div>
    );
}

export default PostDetail;