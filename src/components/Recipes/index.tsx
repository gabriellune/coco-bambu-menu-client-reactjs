import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import backIcon from '../../images/icon-back.png';
import timeIcon from '../../images/icon-time.png';
import { Modal, Button } from 'react-bootstrap';
import HttpConfig from '../../api/HttpConfig';

function Recipes() {
  const [dish, setDish] = useState({
    name: '',
    description: '',
    ingredients: [],
    preparationSteps: [],
    preparationTime: 0,
    smallImageUrl: '',
    bigImageUrl: ''
  });

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [hasAllIngredients, setHasAllIngredients] = useState(false);

  const [seletectedSteps, setSelectedSteps] = useState<string[]>([]);
  const [hasAllSteps, setHasAllSteps] = useState(false);

  const { _id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    async function fetchDish() {
      try {
        const response = await HttpConfig.get(`api/dishes/${_id}`);
        setDish({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchDish();
  }, [_id]);

  useEffect(() => {
    if (selectedIngredients.length === dish.ingredients.length) {
      setHasAllIngredients(true);
    } else if (hasAllIngredients === true) {
      setHasAllIngredients(false);
    }
  }, [selectedIngredients, hasAllIngredients, dish]);

  function handleIngredientClick(event: React.ChangeEvent<HTMLInputElement>) {
    const ingredientName = event.target.name;
    if (!selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
    } else {
      setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient !== ingredientName));
    }
  }

  useEffect(() => {
    if (seletectedSteps.length === dish.preparationSteps.length) {
      setHasAllSteps(true);
    } else if (hasAllSteps === true) {
      setHasAllSteps(false);
    }
  }, [seletectedSteps, hasAllSteps, dish]);

  function handleStepClick(event: React.ChangeEvent<HTMLInputElement>) {
    const stepName = event.target.name;
    if (!seletectedSteps.includes(stepName)) {
      setSelectedSteps([...seletectedSteps, stepName]);
    } else {
      setSelectedSteps(seletectedSteps.filter(step => step !== stepName));
    }
  }

  function handleFinish() {
    if (hasAllIngredients && hasAllSteps) {
      handleShowSuccess();
    } else {
      handleShowFail();
    }
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    history('/');
  };
  const handleShowSuccess = () => setShowSuccess(true);

  const handleCloseFail = () => setShowFail(false);
  const handleShowFail = () => setShowFail(true);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  return (
    <>
      <div className="dish-background" style={{ backgroundImage: `url(${dish.bigImageUrl})` }}>
        <div>
          <div className='back-div mt-2'><Link to='/dishes' style={{ textDecoration: "none", color: "white", height: '60px' }}><img src={backIcon} alt='back icon' style={{ height: "20px" }} /><span className='ms-2 pe-2' style={{ fontSize: "12px", fontWeight: "700" }}>Voltar</span></Link></div>
          <div>
          <div className='d-flex time-div'><img src={timeIcon} alt="time icon" className='my-auto' style={{ height: "35px" }} /><div className='ms-3'><span>Tempo de preparo</span><h6>{`${dish.preparationTime} minutos`}</h6></div></div>
          </div>
        </div>
      </div>
      <div className='d-flex-block dish-title'><h1>{dish.name}</h1><div className='w-75'><h2>{dish.description}</h2></div></div>

      <div style={{ backgroundColor: '#FAFAFA' }} className='checks w-100'>
        <section className='pb-2'>
          <div className='mx-5'>
            <h5 className='mb-3'>Ingredientes</h5>
            <ul style={{ listStyleType: "none" }}>
              {dish.ingredients.map((ingredient) => {
                return (
                  <li key={ingredient}>
                    <div className='group'>
                      <input type="checkbox" id={ingredient} name={ingredient} onChange={handleIngredientClick} />
                      <label htmlFor={ingredient}><span style={{ fontSize: '13px' }}>{ingredient}</span></label>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
        <section className='pt-4 pb-3' style={{ backgroundColor: 'white', height: '50px' }}>
          <div className='mx-5'>
            <h5>Modo de preparo</h5>
            <ul style={{ listStyleType: "none" }}>
              {dish.preparationSteps.map((step, idx) => {
                return (
                  <li key={step}>
                    <div className='group'>
                      <input type="checkbox" id={step} name={step} onChange={handleStepClick} />
                      <label htmlFor={step}><span style={{ fontSize: '13px' }}><strong>Passo {idx + 1}</strong><br />{step}</span></label>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div style={{ backgroundColor: '#FAFAFA' }} className='d-flex w-100 justify-content-end py-3'>
            {hasAllIngredients && hasAllSteps ? <button className='btn px-5 me-3' style={{ backgroundColor: "#27ae60", color: "white" }} onClick={handleFinish}>Finalizar</button> : <button className='btn btn-secondary px-5 me-3' style={{ opacity: "0.5" }} onClick={handleFinish}>Finalizar</button>}
          </div>
        </section>
      </div>
      {/* Modal Falha */}
      <Modal show={showFail} onHide={handleCloseFail}>
        <Modal.Header>
          <Modal.Title>Atenção!</Modal.Title>
        </Modal.Header>
        <Modal.Body><small>Para o prato ser devidamente finalizado é necessário que todos os itens sejam selecionados!</small></Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#FF9300", border: 'none' }} onClick={handleCloseFail}>
            Voltar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Successo */}
      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Header>
          <Modal.Title>Prato finalizado com sucesso!</Modal.Title>
        </Modal.Header>
        <Modal.Body><small>Todas as etapas foram devidamente cumpridas e o prato foi finalizado com Successo!</small></Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#27ae60", border: 'none' }} onClick={handleCloseSuccess}>
            Finalizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Recipes;