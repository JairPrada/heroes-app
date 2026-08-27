import React, { Fragment } from 'react';
import { Button, Card, Image } from 'antd';


const { Meta } = Card;

const HeroCard = ({ id, superhero, publisher, alter_ego, first_appearance, characters }) => {
    return (
        <Fragment>
            <div>
                <Card
                    hoverable
                    id="tarjeta"
                    className="derecha"
                    cover={<Image alt={superhero} width="100%" height="100%" src={`/imagenes/heroes/${id}.jpg`} />}
                >
                    <Meta style={{ color: "white" }}  title={superhero} description={publisher} />
                    <br />
                    <Button href={`heroe/${id}`} type="primary">Ver mas</Button>
                </Card>
            </div>
        </Fragment>
    )
}
export default HeroCard;