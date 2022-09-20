import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.post('/insert', 'CustomersController.insert')
  Route.get('/select', 'CustomersController.select')
  Route.put('/update/:id', 'CustomersController.update')
  Route.delete('/delete/:id', 'CustomersController.delete')
  Route.post('search', 'FormdataController.search')
  Route.get('/nameA', 'FormdataController.nameA')
  Route.get('/nameD', 'FormdataController.nameD')
}).prefix('/customers')
Route.group(() => {
  Route.post('/insert', 'HotelsController.insert')
  Route.get('/select', 'HotelsController.select')
  Route.put('/update/:id', 'HotelsController.update')
  Route.delete('/delete/:id', 'HotelsController.delete')
  Route.post('search', 'FormdataController.search')
  Route.get('/nameA', 'FormdataController.nameA')
  Route.get('/nameD', 'FormdataController.nameD')
}).prefix('/hotels')
