Rails.application.routes.draw do
  root to: 'home#index'
  resources :shorteners
  resources :visitors
  get '/get-shorteners/:shortener_ids', to: 'shorteners#get_shorteners'
  get '/get-total-clicks/:shortener_ids', to: 'shorteners#get_total_clicks'
  get '/get-top-location/:shortener_ids', to: 'visitors#get_top_location'
  get '/get-top-referrer/:shortener_ids', to: 'visitors#get_top_referrer'
  get '/get-clicks-by-date/:shortener_id/:from_date/:to_date', to: 'visitors#get_clicks_by_date'
  get '/get-clicks-by-location/:shortener_id/:from_date/:to_date', to: 'visitors#get_clicks_by_location'
  get '/get-clicks-by-referrer/:shortener_id/:from_date/:to_date', to: 'visitors#get_clicks_by_referrer'
  get '/get-count-click-by-date/:shortener_id/:from_date/:to_date', to: 'visitors#get_count_click_by_date'
  get '/:slug' => 'shorteners#redirect', as: :s
end
