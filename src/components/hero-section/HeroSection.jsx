import heroImage from '../../assets/Images/jenkins.svg';
import pipelineLight from '../../assets/Images/pipeline-light.png';
import pipelineDark from '../../assets/Images/pipeline-dark.png';
import './HeroSection.css';

function HeroSection() {
    return (
        <section className='hero-section'>
            <div className='hero-image'>
                <img src={heroImage} alt='Jenkins butler mascot' />
            </div>
            <div className='hero-content'>
                <h1 className='hero-heading'>
                    Meet the driving forces behind Jenkins
                </h1>
                <p className='hero-subtext'>
                    we showcase the top contributors shaping the future of
                    continuous integration and delivery
                </p>
                <img
                    src={pipelineLight}
                    alt='Contributor journey: Start, Explore, Plan, Build, Validate, Contribute'
                    className='hero-pipeline hero-pipeline-light'
                />
                <img
                    src={pipelineDark}
                    alt='Contributor journey: Start, Explore, Plan, Build, Validate, Contribute'
                    className='hero-pipeline hero-pipeline-dark'
                />
            </div>
        </section>
    );
}

export default HeroSection;
