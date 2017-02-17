class ShortenersController < ApplicationController
    
    # Define PAYLOAD for securing REST APIs
    PAYLOAD = {:data => 'leviettoan'}
    
    # Require JWT authentication when access APIs
    before_action :authenticate

    def index
        shorteners = Shortener.all
        render json: shorteners, status: :ok
    end

    def show
        shortener = Shortener.find(params[:id])
        if shortener
            render json: shortener, status: :ok
        else
            render status: :unprocessable_entity
        end
    end

    def redirect
        shortener = Shortener.where(slug: params[:slug]).first
        if shortener
            shortener.increment!(:count)
            render json: shortener, status: :ok
        else
            render status: :unprocessable_entity
        end
    end

    def create
        if Shortener.exists?(given_url: shortener_params[:given_url])
            error = {:msg => 'exist',:status => 'error'}
            render json: error
        elsif shortener_params[:given_url].include? ENV["url_not_valid"]
            error = {:msg => 'not valid',:status => 'error'}
            render json: error
        else
            shortener = Shortener.new(shortener_params)
            doc = Pismo::Document.new(shortener.given_url)
            shortener.title = doc.title
            if shortener.save
                render json: shortener, status: :created 
            else
                render json: shortener.errors, status: :unprocessable_entity
            end
        end
    end

    def destroy
        shortener = Shortener.find(params[:id])
        if shortener.destroy
            render :nothing, status: :ok
        else
            render json: shortener.errors, status: :unprocessable_entity
        end
    end

    private
    def shortener_params
        params.require(:shortener).permit(:given_url, :count)
    end

    # Use JWT to encode payload then compare with input token
    def authenticate
        input = JWT.encode PAYLOAD, nil, 'none'
        authenticate_or_request_with_http_token do |token, options|
            ActiveSupport::SecurityUtils.secure_compare(
            ::Digest::SHA256.hexdigest(token),
            ::Digest::SHA256.hexdigest(input)
            )
        end
    end
end
