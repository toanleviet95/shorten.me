Rails.application.routes.draw do
  resources :shorteners
  resources :visitors
  get '/get-shorteners/:shortener_ids', to: 'shorteners#get_shorteners'
  get '/get-total-clicks/:shortener_ids', to: 'shorteners#get_total_clicks'
  get '/get-top-location/:shortener_ids', to: 'visitors#get_top_location'
  get '/get-top-referrer/:shortener_ids', to: 'visitors#get_top_referrer'
  get '/get-clicks-by-date/:shortener_id/:from_date/:to_date', to: 'visitors#get_clicks_by_date'
  get '/:slug' => 'shorteners#redirect', as: :s
end
