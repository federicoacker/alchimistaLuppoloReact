import Section from "./Section";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

function Beers() {

  return (
    <>
      <h5>Spine consacrate</h5>
      <h1>Le Spine della Gilda</h1>
      <div className="d-flex justify-content-around">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Text>
              GildaPozione del Drago RossoForgia Fermentata di ValdambraStile: Red Ale speziata · Alcol: 6.8%Matura in botti bruciate dal fiato di drago. Note di caramello scuro, pepe selvatico e brace dolce.€ 7,90
            </Card.Text>
            <Button variant="primary">Ordina ora</Button>
          </Card.Body>
        </Card>


        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Text>
              ArcanaElixir IPA ArcanaLaboratorio Luppolante di MiralunaStile: India Pale Ale · Alcol: 7.2%Infusa con luppoli raccolti al primo bagliore lunare. Profuma di agrumi, resina antica e pergamena fresca.€ 8,40
            </Card.Text>
            <Button variant="primary">Ordina ora</Button>
          </Card.Body>
        </Card>


        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Text>
              CriptaStout del Re SepoltoAbbazia Nera di KorvhaldStile: Imperial Stout · Alcol: 9.1%Densa come inchiostro di necromante. Sapori di cacao amaro, caffè torrefatto e pietra bagnata.€ 9,70
            </Card.Text>
            <Button variant="primary">Ordina ora</Button>
          </Card.Body>
        </Card>



        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Text>
              FeniceGold Ale della FeniceBraciere Dorato di SolariaStile: Golden Ale · Alcol: 5.5%Chiara, luminosa, rinata a ogni sorso. Miele d’orzo, fiori secchi e finale di pane caldo.€ 6,90
            </Card.Text>
            <Button variant="primary">Ordina ora</Button>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default Beers;