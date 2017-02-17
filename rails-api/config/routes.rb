Rails.application.routes.draw do
  resources :shorteners
  get '/:slug' => 'shorteners#redirect', as: :s
end
