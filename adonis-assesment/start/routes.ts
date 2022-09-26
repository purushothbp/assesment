import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.group(() => {
    Route.post('/insert', 'CustomersController.insert')
    Route.get('/select', 'CustomersController.select')
    Route.put('/update/:id', 'CustomersController.update')
    Route.delete('/delete/:id', 'CustomersController.delete')
    Route.post('/search', 'CustomersController.search')
    Route.get('/nameA', 'CustomersController.nameA')
    Route.get('/nameD', 'CustomersController.nameD')
    Route.get('/join', 'CustomersController.join')
  }).prefix('/customers')
  Route.group(() => {
    Route.post('/insert', 'HotelsController.insert')
    Route.get('/select', 'HotelsController.select')
    Route.put('/update/:id', 'HotelsController.update')
    Route.delete('/delete/:id', 'HotelsController.delete')
    Route.post('/search', 'HotelsController.search')
    Route.get('/nameA', 'HotelsController.nameA')
    Route.get('/nameD', 'HotelsController.nameD')
    Route.get('/join', 'HotelsController.join')
  }).prefix('/hotels')
}).middleware('Client')
