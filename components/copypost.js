<div className={styles.post_content}>
    <Container>
        <Row>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div className={styles.camera}>
                <ImageUpload />
                </div>
                              
            </div>  
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                              
            </div>            
        </Row>
        
    </Container>
    <Container>
        <Row>
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">          
            </div> 
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div>Bạn đã đăng hình món mình nấu ở đây chưa</div>
                              
            </div>    
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                          
            </div>             
        </Row>
        
    </Container>
    <Container>
        <Row>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">          
            </div> 
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                
                <div className={styles.inspired}>Truyền cảm hứng nấu món của bạn đến mọi người nào</div>
                              
            </div>    
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                          
            </div>             
        </Row>
        
    </Container>
    <div className={styles.dish_name_content}>
        <br></br>
    <Container>
        <Row>
            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">          
            </div> 
            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                
                <input className={styles.dish_name}placeholder="Tên món: Mỳ tôm"></input>
                              
            </div>    
            
            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">
                          
            </div>             
        </Row>
        
    </Container>
    <br></br>
    <Container>
        <Row>
            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">          
            </div> 
            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                
                <input className={styles.talk_about} placeholder="Hãy chia sẻ với mọi người về món này của bạn- ai đã truyền cảm hứng cho bạn, 
                tại sao nó đặc biệt,v.v..?"></input>
                <button className={styles.dish_origin}>   
                <div id="modal">
                <button onClick={() => setShowModal(true)}>Thêm xuất xứ của món</button>
                <Modal
                  onClose={() => setShowModal(false)}
                  show={showModal}
                >
                  Hello from the modal!
                </Modal>
            </div>
            </button>
                              
            </div>    
            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">
                          
            </div>             
        </Row>
        
    </Container>
    <br></br>
    <Container>
        <Row>
        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">          
            </div>
            <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                Khẩu phần<br></br><br></br>
                Thời gian nấu      
            </div> 
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                
                <input className="styles.dish_description" placeholder="1 người"></input><br></br><br></br>
                <input className="styles.dish_description" placeholder="5 phút"></input>
                              
            </div>    
            
        </Row>
        
    </Container>
    </div>
    <br></br>
    <div className={styles.material}>
        <br></br>
    <Container>
        <Row>
        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">          
            </div>
            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12">
            <h4><b>Nguyên Liệu</b></h4>    
            </div>   
            
        </Row>
        
    </Container>
    <Container>
        <Row>
        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">          
            </div>
            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12">
                <input placeholder="1 gói mỳ"></input><br></br><br></br>
                <input placeholder="gia vị"></input>    
            </div>   
            
        </Row>
        
    </Container>
    <Container>
        <Row>
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                  
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <button className={styles.plus}>+ Nguyên liệu</button> 
                <button className={styles.plus}>+ Phần</button>   
            </div>   
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                 
            </div>      
            
        </Row>
        
    </Container>
    </div>
    <br></br>
    <div className={styles.step}>
    <br></br>
    <Container>
        <Row>
        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">          
            </div>
            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12">
            <h4><b>Các bước:</b> </h4>    
            </div>   
            
        </Row>
        
    </Container>
    <br></br>
    <Container>
        <Row>
            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">          
            </div> 
            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                
                <input placeholder="Cho mỳ và gia vị vào bát"></input>
                              
            </div>    
            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">
                          
            </div>             
        </Row>
        
    </Container>
    <br></br>
    <Container>
        <Row>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div className={styles.camera}>
                <ImageUpload />
                </div>
                              
            </div>  
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                              
            </div>            
        </Row>
        
    </Container>
    <br></br>
    <Container>
        <Row>
            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">          
            </div> 
            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                
                <input placeholder="Đậy kín lại và chờ trong vòng 3 phút" ></input>
                              
            </div>    
            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">
                          
            </div>             
        </Row>
        
    </Container>
    <br></br>
    <Container>
        <Row>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div className={styles.camera}>
                <ImageUpload />
                </div>
                              
            </div>  
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                              
            </div>            
        </Row>
        
    </Container>
    <Container>
        <Row>
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                  
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                <button className={styles.plus}>+ Bước làm</button>    
            </div>   
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                 
            </div>      
            
        </Row>
        
    </Container>
    </div>
    </div>