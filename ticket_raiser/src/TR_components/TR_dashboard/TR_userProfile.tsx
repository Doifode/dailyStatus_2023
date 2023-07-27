import { Box, Card, Paper, Typography } from "@material-ui/core"
import { IRegisterUser } from "../TR_constants"
import { ImUser } from "react-icons/im";

export const TR_userProfile = (props: IRegisterUser) => {
    const { Fname, Lname, Mobile, id, Username, Password } = props
    return (
        <div>
            <Card>
                <Paper>
                    <Box>
                        <ImUser />
                    </Box>
                    <Box>
                        <Typography component="div">{`${Fname} ${Lname}`}</Typography>
                        <Typography component="div">{`${Mobile}`}</Typography>
                    </Box>
                </Paper>
            </Card>
        </div>
    )
}
