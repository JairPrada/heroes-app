import React, { Fragment, useMemo } from 'react';
import { useParams } from 'react-router';

import { getHeroesById } from '../selectors/getHeroeById';
import { Col, Image, Row, Button, Divider } from 'antd';
import Title from 'antd/lib/typography/Title';

const HeroCaracteristicas = ({ history }) => {
    const { id } = useParams();
    const volver = () => {
        if (history.length <= 2) {
            history.push("/marvel")
        }
        else {
            history.goBack()
        }
    }

    const { superhero, publisher, alter_ego, first_appearance, characters } = useMemo(() => getHeroesById(id), [id])
    return (
        <Fragment>
            <Row gutter={[48, 0]} align="center" >
                <Col xs={11} md={9}  >
                    <div style={{ width: '100%', border: '1px  #7A7C7E', padding: '5px', borderRadius: ".5rem" }}>
                        <Image className="izquierda" alt="example" style={{ borderRadius: ".5rem" }} src={`/imagenes/heroes/${id}.jpg`} />
                    </div>
                </Col>
                <Col xs={13} md={15} className="derecha" >

                    <strong><Title>{superhero}</Title></strong>
                    <Divider />
                    <p> <strong>Editorial :</strong> {publisher}</p>
                    <p><strong>Alter Ego :</strong> {alter_ego}</p>
                    <p><strong>Primera Aparicion :</strong> {first_appearance}</p>
                    <p><strong>Nombre :</strong> {characters}</p>
                    <Button type="primary" onClick={volver}>Volver</Button>

                </Col>
            </Row>
        </Fragment >
    )
}
export default HeroCaracteristicas;