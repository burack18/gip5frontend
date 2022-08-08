import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Container } from '@mui/system';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import {useNavigate} from 'react-router-dom'
import { useTranslation } from 'react-i18next';



export const MainPage = () => {
    const { t } = useTranslation();
    
    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));
    const [expanded, setExpanded] = React.useState(false);
    const [likeColor, setlikeColor] = React.useState('')
    const navigate=useNavigate();
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const like=()=>{
        setlikeColor('error')
    }
    return (
        <Container>
            
            <Card sx={{ maxWidth: '100%' }}>
                <CardHeader
                    avatar={
                        <Avatar src='/uclllogo.jpg' sx={{ bgcolor: red[500] }} aria-label="recipe">
                            B
                        </Avatar>
                    }

                    title="Brandstoff tracker Application"
                    subheader={`${Date()}`}
                />
                <CardMedia
                    component="img"
                    height="450"
                    image='/brandstofPicture.webp'
                    alt="BrandstofPicture"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {t('mainpage.description')}                      
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={()=>like()} >
                        <FavoriteIcon color={likeColor}  />
                    </IconButton>
                    <IconButton color='primary' onClick={()=>navigate('/login')}><LoginOutlinedIcon />Login to continue</IconButton>
                   
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            
                        >
                            <ExpandMoreIcon />

                        </ExpandMore>
                        {t('mainpage.showmore')}                                      
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                        {t('mainpage.projectdescription')} 
                        </Typography>
                        <Typography paragraph>
                        {t('mainpage.abilitiesofapp')} 
                        </Typography>
                        <Typography paragraph>
                        {t('mainpage.thanks')} 
                        </Typography>
                        <Typography>
                            Omer Faruk Aksak
                            r0829654
                        </Typography>
                    </CardContent>

                </Collapse>
            </Card>

        </Container>
    )
}
